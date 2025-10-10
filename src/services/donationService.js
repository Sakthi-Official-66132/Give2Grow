// Donation service with Firebase Realtime Database integration
import { database } from '../config/firebase.js';
import { ref, push, set, onValue, off, update, remove, query, orderByChild, equalTo } from 'firebase/database';

class DonationService {
  constructor() {
    this.donationsRef = ref(database, 'donations');
  }

  // Create new donation
  async createDonation(donationData) {
    try {
      console.log('DonationService: Creating donation', donationData);
      
      // Get current user info (you might want to get this from auth context)
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      const newDonation = {
        ...donationData,
        donorId: currentUser.uid || 'current_user_id',
        donorName: currentUser.name || 'Current User',
        donorEmail: currentUser.email || 'user@example.com',
        donorPhone: currentUser.phone || '+1-555-0123',
        status: donationData.status || 'available',
        views: 0,
        claims: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Push to Firebase Realtime Database
      const newDonationRef = push(this.donationsRef);
      await set(newDonationRef, newDonation);

      return { 
        success: true, 
        donation: { 
          id: newDonationRef.key, 
          ...newDonation 
        } 
      };
    } catch (error) {
      console.error('DonationService: Create donation error', error);
      return { success: false, error: error.message };
    }
  }

  // Get all donations with real-time updates
  subscribeToAllDonations(callback) {
    const unsubscribe = onValue(this.donationsRef, (snapshot) => {
      const donations = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          donations.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      }
      callback(donations);
    });

    return unsubscribe;
  }

  // Get donations for a specific user
  subscribeToUserDonations(userId, callback) {
    const userDonationsQuery = query(
      this.donationsRef,
      orderByChild('donorId'),
      equalTo(userId)
    );

    const unsubscribe = onValue(userDonationsQuery, (snapshot) => {
      const donations = [];
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          donations.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
      }
      callback(donations);
    });

    return unsubscribe;
  }

  // Update donation
  async updateDonation(donationId, updateData) {
    try {
      console.log('DonationService: Updating donation', donationId, updateData);
      
      const donationRef = ref(database, `donations/${donationId}`);
      const updatedData = {
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      await update(donationRef, updatedData);

      return { success: true, donation: { id: donationId, ...updatedData } };
    } catch (error) {
      console.error('DonationService: Update donation error', error);
      return { success: false, error: error.message };
    }
  }

  // Delete donation
  async deleteDonation(donationId) {
    try {
      console.log('DonationService: Deleting donation', donationId);
      
      const donationRef = ref(database, `donations/${donationId}`);
      await remove(donationRef);

      return { success: true, message: 'Donation deleted successfully' };
    } catch (error) {
      console.error('DonationService: Delete donation error', error);
      return { success: false, error: error.message };
    }
  }

  // Get donation by ID
  async getDonationById(donationId) {
    try {
      console.log('DonationService: Getting donation by ID', donationId);
      
      return new Promise((resolve) => {
        const donationRef = ref(database, `donations/${donationId}`);
        onValue(donationRef, (snapshot) => {
          if (snapshot.exists()) {
            resolve({
              success: true,
              donation: {
                id: snapshot.key,
                ...snapshot.val()
              }
            });
          } else {
            resolve({
              success: false,
              error: 'Donation not found'
            });
          }
        }, { onlyOnce: true });
      });
    } catch (error) {
      console.error('DonationService: Get donation by ID error', error);
      return { success: false, error: error.message };
    }
  }

  // Claim donation (for activists)
  async claimDonation(donationId, claimData) {
    try {
      console.log('DonationService: Claiming donation', donationId, claimData);
      
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      const updateData = {
        status: 'claimed',
        claimedBy: currentUser.name || 'Current User',
        claimedById: currentUser.uid || 'current_user_id',
        claimedAt: new Date().toISOString(),
        claimMessage: claimData.message || '',
        updatedAt: new Date().toISOString()
      };

      const result = await this.updateDonation(donationId, updateData);
      
      if (result.success) {
        return {
          success: true,
          claim: {
            id: Date.now(),
            donationId,
            ...updateData
          }
        };
      }

      return result;
    } catch (error) {
      console.error('DonationService: Claim donation error', error);
      return { success: false, error: error.message };
    }
  }

}

// Create and export a singleton instance
const donationService = new DonationService();
export default donationService;