import { useCallback, useState } from "react";
import { profileApi } from "../services/profile.api";
import type { UserProfile, ProfileUpdateInput } from "../types/profile";
import { toast } from "sonner";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await profileApi.getProfile();
      setProfile(res);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch user profile details.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: ProfileUpdateInput) => {
    try {
      setUpdating(true);
      setError(null);
      const res = await profileApi.updateProfile(data);
      setProfile(res);
      toast.success("Profile updated successfully!");
      return res;
    } catch (err: unknown) {
      console.error(err);
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
        || "Failed to update profile. Please try again.";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setUpdating(false);
    }
  }, []);

  return {
    profile,
    loading,
    updating,
    error,
    setError,
    fetchProfile,
    updateProfile,
  };
}
