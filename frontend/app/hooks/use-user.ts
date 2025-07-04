import { fetchData, postData, updateData } from "../../src/lib/fetch-utils";
import type {
  ChangePasswordFormData,
  ProfileFormData,
} from "../routes/user/profile";
import { useMutation, useQuery, type QueryKey } from "@tanstack/react-query";
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type { twoFactorFormData } from "~/routes/auth/twoface";

const queryKey: QueryKey = ["user"]; 

export const useUserProfileQuery = () => {
  return useQuery({
    queryKey,
    queryFn: () => fetchData("/users/profile"),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordFormData) =>
      updateData("/users/change-password", data),
  });
};

export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: (data: ProfileFormData) => updateData("/users/profile", data),
  });
};

// export const  sentVerifyTwoFAMutation= () => {
//   return useMutation({
//     mutationFn: (data: { email: string}) => postData("/users/verify", data),
//   });
// };



// ~/hooks/use-user.ts


// export const useSendVerificationEmailMutation = () => {
//   return useMutation({
//     mutationFn: async (email: string) => {
//       const res = await fetch("/users/send-verification-email", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         const error: any = new Error("Failed to send email");
//         error.response = { data: errorData };
//         throw error;
//       }

//       return res.json(); // Or expected response type
//     },
//   });
// };




// export const useVerifyTwoFAMutation = () => {
//   return useMutation({
//     mutationFn: (data: { email: string}) =>
//       postData("/users/verify", data),
//   });
// };

// export const useToggleTwoFA = () => {
//   const queryClient = useQueryClient();
//   // return useMutation({
//   //   mutationFn: async (enable: boolean) => {
//   //     const res = updateData('/users/toggle-2fa', { enable });
//   //     //return res.data;
//   //   },
   
//   // });

//   mutationFn: async (enable: boolean) => {
//     return updateData('/users/toggle-2fa', { enable });
//   }
// };


// export const useToggleTwoFA = () => {
//   return useMutation({
//     mutationFn: async (enable: boolean) => {
//       const res = await updateData('/users/toggle-2fa', { enable }); // ✅
//       return res.data;
//     },
//   });
// };

export const useToggleTwoFA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enable: boolean) => {
      const res = await updateData('/users/toggle-2fa', { enable });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] }); // ✅ refresh user data
    },
  });
};







// export const useToggleTwoFA = () => {
//   const queryClient = useQueryClient();

//   return useMutation({

    
//       mutationFn: (enable: boolean) => updateData("/users/toggle-2fa", { enable }),
//     });
    
    
// };