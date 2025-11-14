/**
 * Dashboard Page
 * 
 * Main dashboard for authenticated users.
 * Shows list of pets and account options.
 * Protected route - requires authentication.
 * 
 * IMPORTANT: Uses SupabaseProvider context for session management.
 * This ensures the auth state is always in sync across the app.
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/SupabaseProvider';
import { useToast } from '@/components/ToastContainer';
import LoadingSpinner from '@/components/LoadingSpinner';
import LazyImage from '@/components/LazyImage';
import { getUserPets, deletePet, duplicatePet, convertRowToPetData } from '@/lib/pets';
import { formatAge } from '@/types/pet';
import type { Database } from '@/types/supabase';

type PetRow = Database['public']['Tables']['pets']['Row'];

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, session } = useSupabase();
  const { success, error: showError } = useToast();
  const [pets, setPets] = useState<PetRow[]>([]);
  const [petsLoading, setPetsLoading] = useState(true);
  const [deletingPetId, setDeletingPetId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Redirect to login if not authenticated (only after loading completes)
  useEffect(() => {
    if (!loading && !user) {
      console.log('[Dashboard] No user session found, redirecting to login');
      router.push('/auth/login');
    } else if (user) {
      console.log('[Dashboard] ✅ User authenticated:', {
        userId: user.id,
        email: user.email,
        sessionExpiry: session?.expires_at 
          ? new Date(session.expires_at * 1000).toISOString() 
          : 'unknown',
      });
    }
  }, [user, loading, session, router]);

  // Fetch user's pets
  useEffect(() => {
    const fetchPets = async () => {
      if (!user) return;

      console.log('[Dashboard] Fetching pets for user:', user.id);
      setPetsLoading(true);

      const result = await getUserPets(user.id);

      if (result.success && result.data) {
        console.log('[Dashboard] ✅ Fetched pets:', result.data.length);
        setPets(result.data);
      } else {
        console.error('[Dashboard] ❌ Failed to fetch pets:', result.error);
        showError('Failed to load your pets. Please try again.');
      }

      setPetsLoading(false);
    };

    fetchPets();
  }, [user]);

  // Handle delete pet
  const handleDeletePet = async (petId: string) => {
    if (!user) return;

    setDeletingPetId(petId);
    console.log('[Dashboard] Deleting pet:', petId);

    const result = await deletePet(petId, user.id);

    if (result.success) {
      console.log('[Dashboard] ✅ Pet deleted successfully');
      // Remove from local state
      setPets(prevPets => prevPets.filter(p => p.id !== petId));
      setConfirmDeleteId(null);
      success('Pet deleted successfully!');
    } else {
      console.error('[Dashboard] ❌ Failed to delete pet:', result.error);
      showError(`Failed to delete pet: ${result.error}`);
    }

    setDeletingPetId(null);
  };

  // Handle duplicate pet
  const handleDuplicatePet = async (petId: string) => {
    if (!user) return;

    console.log('[Dashboard] Duplicating pet:', petId);

    const result = await duplicatePet(petId, user.id);

    if (result.success && result.data) {
      console.log('[Dashboard] ✅ Pet duplicated successfully');
      // Add to local state
      setPets(prevPets => [result.data!, ...prevPets]);
      success('Pet duplicated successfully!');
    } else {
      console.error('[Dashboard] ❌ Failed to duplicate pet:', result.error);
      showError(`Failed to duplicate pet: ${result.error}`);
    }
  };

  // Loading state with modern design
  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
              <div className="relative w-20 h-20 bg-white rounded-full p-3 shadow-2xl">
                <img 
                  src="/svg/pawthenticate-icon-only.svg" 
                  alt="Pawthenticate" 
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-400 mx-auto mb-4"></div>
          <p className="text-xl font-bold text-neutral-700">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 -z-10">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-96 h-96 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Floating Paw Prints */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-32 left-10 text-5xl opacity-10 animate-float">🐾</div>
        <div className="absolute top-64 right-20 text-4xl opacity-10 animate-float animation-delay-1000">🐾</div>
        <div className="absolute bottom-32 left-1/4 text-6xl opacity-10 animate-float animation-delay-2000">🐾</div>
        <div className="absolute bottom-64 right-1/3 text-3xl opacity-10 animate-float animation-delay-3000">🐾</div>
      </div>

      {/* Modern Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 py-4 px-4 sm:px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-white rounded-full p-1.5 shadow-md transform group-hover:scale-110 transition-transform">
                <img 
                  src="/svg/pawthenticate-icon-only.svg" 
                  alt="Pawthenticate Logo" 
                  className="w-full h-full"
                />
              </div>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              Pawthenticate
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/account" 
              className="px-4 py-2 text-sm font-bold text-neutral-700 bg-white/80 backdrop-blur-sm border-2 border-neutral-200 hover:border-primary-300 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              ⚙️ Account
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl md:text-6xl font-black text-neutral-900 mb-4 leading-tight">
              Welcome back
              <span className="block mt-2 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500 bg-clip-text text-transparent">
                {user?.email ? user.email.split('@')[0] : 'Friend'}! 🐾
              </span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Manage your pet resumes and create professional profiles that landlords love
            </p>
          </div>

          {/* My Pets Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-neutral-900">
                My Pets 🐾
              </h2>
              <Link 
                href="/create"
                className="px-6 py-3 bg-gradient-to-r from-primary-400 to-secondary-400 text-white font-bold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                + Add New Pet
              </Link>
            </div>

            {/* Loading State */}
            {petsLoading && (
              <div className="text-center py-12">
                <LoadingSpinner size="lg" text="Loading your pets..." />
              </div>
            )}

            {/* Empty State */}
            {!petsLoading && pets.length === 0 && (
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-400 via-secondary-400 to-primary-500 opacity-90"></div>
                <div className="absolute inset-0">
                  <div className="absolute top-10 left-10 text-6xl opacity-20 animate-float">🐶</div>
                  <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-float animation-delay-2000">🐱</div>
                  <div className="absolute top-1/2 left-1/3 text-5xl opacity-20 animate-float animation-delay-1000">🐾</div>
                </div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-10 md:p-12 shadow-2xl border border-white/30 text-center">
                  <div className="text-7xl mb-6 animate-bounce">✨</div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                    No Pets Yet!
                  </h2>
                  <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
                    Create your first pet resume and start managing your furry friends.
                  </p>
                  <Link
                    href="/create"
                    className="inline-block bg-white text-primary-500 font-bold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-xl"
                  >
                    Create First Pet Resume
                  </Link>
                </div>
              </div>
            )}

            {/* Pets Grid */}
            {!petsLoading && pets.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet) => {
                  const petData = convertRowToPetData(pet);
                  const age = formatAge(petData);
                  const isDeleting = deletingPetId === pet.id;
                  const showConfirmDelete = confirmDeleteId === pet.id;

                  return (
                    <div key={pet.id} className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/50 transition-all duration-300">
                        {/* Pet Photo */}
                        <div className="mb-4 relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                          {pet.photo_url ? (
                            <LazyImage
                              src={pet.photo_url} 
                              alt={pet.pet_name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-6xl">
                              {pet.species === 'dog' ? '🐶' : pet.species === 'cat' ? '🐱' : '🐾'}
                            </div>
                          )}
                        </div>

                        {/* Pet Info */}
                        <h3 className="text-2xl font-black text-neutral-900 mb-2">
                          {pet.pet_name}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-1">
                          {pet.breed || pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
                        </p>
                        <p className="text-sm text-neutral-600 mb-4">
                          {age}
                        </p>

                        {/* Action Buttons */}
                        {!showConfirmDelete && (
                          <div className="flex gap-2">
                            <Link
                              href={`/preview?petId=${pet.id}`}
                              className="flex-1 px-4 py-2 bg-primary-400 text-white font-bold rounded-full text-center hover:bg-primary-500 transition-colors text-sm"
                            >
                              View
                            </Link>
                            <Link
                              href={`/create?petId=${pet.id}`}
                              className="flex-1 px-4 py-2 bg-secondary-400 text-white font-bold rounded-full text-center hover:bg-secondary-500 transition-colors text-sm"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDuplicatePet(pet.id)}
                              className="px-4 py-2 bg-neutral-200 text-neutral-700 font-bold rounded-full hover:bg-neutral-300 transition-colors text-sm"
                              title="Duplicate"
                            >
                              📋
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(pet.id)}
                              className="px-4 py-2 bg-red-100 text-red-600 font-bold rounded-full hover:bg-red-200 transition-colors text-sm"
                              title="Delete"
                            >
                              🗑️
                            </button>
                          </div>
                        )}

                        {/* Delete Confirmation */}
                        {showConfirmDelete && (
                          <div className="space-y-3">
                            <p className="text-sm font-semibold text-red-600 text-center">
                              Delete {pet.pet_name}?
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDeletePet(pet.id)}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors text-sm disabled:opacity-50"
                              >
                                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                              </button>
                              <button
                                onClick={() => setConfirmDeleteId(null)}
                                disabled={isDeleting}
                                className="flex-1 px-4 py-2 bg-neutral-200 text-neutral-700 font-bold rounded-full hover:bg-neutral-300 transition-colors text-sm disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

