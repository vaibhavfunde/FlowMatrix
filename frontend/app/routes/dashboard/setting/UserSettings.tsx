



// 'use client';

// import { useState, useEffect } from 'react';
// import {
//   Mail,
//   Shield,
//   Calendar,
//   Edit3,
//   Save,
//   XCircle,
//   Loader2,
//   AlertCircle,
//   Camera,
// } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { toast } from 'sonner';
// import { Switch } from '@/components/ui/switch';
// import {
//   useChangePassword,
  
//   useToggleTwoFA,
  
//   useUpdateUserProfile,
//   useUserProfileQuery,
// } from '../../../hooks/use-user';
// import type { User } from '~/types';

// const changePasswordSchema = z
//   .object({
//     currentPassword: z.string().min(1, { message: 'Current password is required' }),
//     newPassword: z.string().min(8, { message: 'New password must be at least 8 characters' }),
//     confirmPassword: z.string().min(8, { message: 'Confirm password is required' }),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: 'Passwords do not match',
//     path: ['confirmPassword'],
//   });

// const profileSchema = z.object({
//   name: z.string().min(1, { message: 'Name is required' }),
//   email: z.string().email({ message: 'Valid email is required' }),
//   profilePicture: z.string().optional(),
// });

// export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
// export type ProfileFormData = z.infer<typeof profileSchema>;

// const UserSettings = () => {
//   const { data: user, isPending: isLoadingUser } = useUserProfileQuery() as {
//     data: User;
//     isPending: boolean;
//   };

//   // const { mutate: toggle2FA, isPending: isToggling2FA } = useToggleTwoFA();
 
//   const { mutate: toggle2FA, isPending: isToggling2FA } = useToggleTwoFA();

//   if (isLoadingUser) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   const [isEditing, setIsEditing] = useState(false);
//   const [passwordError, setPasswordError] = useState<string | null>(null);

//   const { mutate: updateUserProfile, isPending: isUpdatingProfile } = useUpdateUserProfile();
//   const { mutate: changePassword, isPending: isChangingPassword, error: changePasswordError } =
//     useChangePassword();

//   const profileForm = useForm<ProfileFormData>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       profilePicture: '',
//     },
//   });

//   const passwordForm = useForm<ChangePasswordFormData>({
//     resolver: zodResolver(changePasswordSchema),
//     defaultValues: {
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: '',
//     },
//   });

//   const [enabled, setEnabled] = useState(false);
 

//   useEffect(() => {
//     if (user) {
//       setEnabled(user.is2FAEnabled); // update toggle state
//       profileForm.reset({
//         name: user.name,
//         email: user.email,
//         profilePicture: user.profilePicture || '',
//       });
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user) {
//       profileForm.reset({
//         name: user.name,
//         email: user.email,
//         profilePicture: user.profilePicture || '',
//       });
//     }
//   }, [user]);

//   const handleProfileSave = (values: ProfileFormData) => {
//     updateUserProfile(values, {
//       onSuccess: () => {
//         toast.success('Profile updated successfully');
//         setIsEditing(false);
//       },
//       onError: (error: any) => {
//         const errorMessage = error.response?.data?.error || 'Failed to update profile';
//         toast.error(errorMessage);
//       },
//     });
//   };

//   const handlePasswordChange = (values: ChangePasswordFormData) => {
//     setPasswordError(null);
//     changePassword(values, {
//       onSuccess: () => {
//         toast.success('Password updated successfully');
//         passwordForm.reset();
//       },
//       onError: (error: any) => {
//         const errorMessage = error.response?.data?.error || 'Failed to update password';
//         setPasswordError(errorMessage);
//         toast.error(errorMessage);
//       },
//     });
//   };

//   const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const result = e.target?.result as string;
//         profileForm.setValue('profilePicture', result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const formatLastLogin = (date?: Date) => {
//     if (!date) return 'Never';
//     return new Intl.DateTimeFormat('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     }).format(new Date(date));
//   };

//   if (isLoadingUser) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
//       </div>
//     );
//   }

 

//   // const handleToggle2FA = () => {
//   //   toggle2FA(!user.is2FAEnabled, {
//   //     onSuccess: () => {
//   //       toast.success(`Two-Factor Authentication ${user.is2FAEnabled ? 'disabled' : 'enabled'}`);
//   //     },
//   //     onError: () => {
//   //       toast.error('Failed to toggle Two-Factor Authentication');
//   //     },
//   //   });
//   // };
  

//   const handleToggle2FA = () => {
//     const newValue = !user.is2FAEnabled; // ✅ use the correct key
  
//     toggle2FA(newValue, {
//       onSuccess: () => {
//         toast.success(`Two-Factor Authentication ${newValue ? 'enabled' : 'disabled'}`);
//       },
//       onError: () => {
//         toast.error('Failed to toggle Two-Factor Authentication');
//       },
//     });
//   };


  
//   return (
//     <div className="max-w-2xl mx-auto p-6 space-y-8">
//       <div>
//         <h1 className="text-2xl font-semibold text-gray-900 mb-2">Account Settings</h1>
//         <p className="text-gray-600">Manage your profile and security settings</p>
//       </div>

//       {/* Profile Section */}
//       <div className="bg-white border border-gray-200 rounded-lg p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-lg font-medium text-gray-900">Profile</h2>
//           {!isEditing ? (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="text-sm px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-2"
//             >
//               <Edit3 className="w-4 h-4" /> Edit
//             </button>
//           ) : (
//             <div className="flex gap-2">
//               <button
//                 onClick={() => {
//                   profileForm.reset();
//                   setIsEditing(false);
//                 }}
//                 className="text-sm px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-2"
//               >
//                 <XCircle className="w-4 h-4" /> Cancel
//               </button>
//               <button
//                 onClick={profileForm.handleSubmit(handleProfileSave)}
//                 disabled={isUpdatingProfile}
//                 className="text-sm px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md flex items-center gap-2 disabled:opacity-50"
//               >
//                 {isUpdatingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                 {isUpdatingProfile ? 'Saving...' : 'Save'}
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="flex items-start gap-6 mb-6">
//           <div className="relative">
//             {profileForm.watch('profilePicture') ? (
//               <img
//                 src={profileForm.watch('profilePicture')}
//                 alt="Avatar"
//                 className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
//               />
//             ) : (
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium text-lg border-2 border-gray-200">
//                 {user?.name?.charAt(0).toUpperCase() || 'U'}
//               </div>
//             )}
//             {isEditing && (
//               <>
//                 <input
//                   id="avatar-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={handleAvatarChange}
//                   style={{ display: 'none' }}
//                 />
//                 <button
//                   onClick={() => document.getElementById('avatar-upload')?.click()}
//                   className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700"
//                 >
//                   <Camera className="w-3 h-3" />
//                 </button>
//               </>
//             )}
//           </div>
//           <div>
//             <h3 className="font-medium text-gray-900 mb-1">{user.name}</h3>
//             <p className="text-sm text-gray-600 mb-1">{user.email}</p>
//             {user.isEmailVerified ? (
//               <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Verified</span>
//             ) : (
//               <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">✗ Unverified</span>
//             )}
//           </div>
//         </div>

//         <form onSubmit={profileForm.handleSubmit(handleProfileSave)} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Name</label>
//             <input
//               {...profileForm.register('name')}
//               disabled={!isEditing}
//               className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
//             />
//             {profileForm.formState.errors.name && (
//               <p className="text-red-500 text-sm">{profileForm.formState.errors.name.message}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Email</label>
//             <input
//               {...profileForm.register('email')}
//               disabled
//               className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-500"
//             />
//           </div>
//         </form>
//       </div>

//       {/* Security Section */}
//       <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
//         <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
//           <Shield className="w-5 h-5 text-gray-600" /> Security
//         </h2>

//         {/* Change Password */}
//         <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
//           {passwordError && (
//             <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded border border-red-200 text-sm">
//               <AlertCircle className="w-4 h-4" />
//               {passwordError}
//             </div>
//           )}
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Current Password</label>
//             <input
//               {...passwordForm.register('currentPassword')}
//               type="password"
//               className="w-full px-3 py-2 border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">New Password</label>
//             <input
//               {...passwordForm.register('newPassword')}
//               type="password"
//               className="w-full px-3 py-2 border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
//             <input
//               {...passwordForm.register('confirmPassword')}
//               type="password"
//               className="w-full px-3 py-2 border rounded-md"
//             />
//           </div>
//           <button
//             type="submit"
//             disabled={isChangingPassword}
//             className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 disabled:opacity-50"
//           >
//             {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
//             {isChangingPassword ? 'Updating...' : 'Update Password'}
//           </button>
//         </form>

//         {/* Two-Factor Authentication Toggle */}
// <div className="flex items-center justify-between border-t pt-4">
//   <div>
//     <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
//     <p className="text-sm text-gray-600">
//       Add an extra layer of security to your account.
//     </p>
//   </div>
//    {/* <Switch
//     checked={user.isTwoFactorEnabled}
//    onCheckedChange={handleToggle2FA}
//    disabled={isToggling2FA}
//   />  */}

// {/* <Switch
//   checked={user.is2FAEnabled} // ✅ use the same field name
//   onCheckedChange={handleToggle2FA}
//   disabled={isToggling2FA}
// /> */}
// <Switch
//   checked={user.is2FAEnabled}
//   onCheckedChange={handleToggle2FA}
//   disabled={isToggling2FA}
// />


// </div>


//         {/* Last Login */}
//         <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
//           <Calendar className="w-5 h-5 text-gray-600" />
//           <div>
//             <h3 className="font-medium text-gray-900">Last Login</h3>
//             {/* <p className="text-sm text-gray-600">{formatLastLogin(user?.lastLogin)}</p> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSettings;













'use client';

import { useState, useEffect } from 'react';
import {
  Mail,
  Shield,
  Calendar,
  Edit3,
  Save,
  XCircle,
  Loader2,
  AlertCircle,
  Camera,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import {
  useChangePassword,
  
  useToggleTwoFA,
  
  useUpdateUserProfile,
  useUserProfileQuery,
} from '../../../hooks/use-user';
import type { User } from '~/types';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(8, { message: 'New password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Confirm password is required' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const profileSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  profilePicture: z.string().optional(),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;

const UserSettings = () => {
  const { data: user, isPending: isLoadingUser } = useUserProfileQuery() as {
    data: User;
    isPending: boolean;
  };
  // const { mutate: toggle2FA, isPending: isToggling2FA } = useToggleTwoFA();
 
  const [isEditing, setIsEditing] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(user?.is2FAEnabled);

  const { mutate: toggle2FA, isPending: isToggling2FA } = useToggleTwoFA();
  const { mutate: updateUserProfile, isPending: isUpdatingProfile } = useUpdateUserProfile();
  const { mutate: changePassword, isPending: isChangingPassword, error: changePasswordError } = useChangePassword();

  // if (isLoadingUser) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
  //     </div>
  //   );
  // }

  // const [isEditing, setIsEditing] = useState(false);
  // const [passwordError, setPasswordError] = useState<string | null>(null);

  // const { mutate: updateUserProfile, isPending: isUpdatingProfile } = useUpdateUserProfile();
  // const { mutate: changePassword, isPending: isChangingPassword, error: changePasswordError } =
  //   useChangePassword();

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      profilePicture: '',
    },
  });

  const passwordForm = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  //const [enabled, setEnabled] = useState(false);
 

  useEffect(() => {
    if (user) {
      setEnabled(user.is2FAEnabled); // update toggle state
      profileForm.reset({
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture || '',
      });
    }
  }, [user]);

  const handleProfileSave = (values: ProfileFormData) => {
    updateUserProfile(values, {
      onSuccess: () => {
        toast.success('Profile updated successfully');
        setIsEditing(false);
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.error || 'Failed to update profile';
        toast.error(errorMessage);
      },
    });
  };

  const handlePasswordChange = (values: ChangePasswordFormData) => {
    setPasswordError(null);
    changePassword(values, {
      onSuccess: () => {
        toast.success('Password updated successfully');
        passwordForm.reset();
      },
      onError: (error: any) => {
        const errorMessage = error.response?.data?.error || 'Failed to update password';
        setPasswordError(errorMessage);
        toast.error(errorMessage);
      },
    });
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        profileForm.setValue('profilePicture', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatLastLogin = (date?: Date) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  // if (isLoadingUser) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
  //     </div>
  //   );
  // }

 

  // const handleToggle2FA = () => {
  //   toggle2FA(!user.is2FAEnabled, {
  //     onSuccess: () => {
  //       toast.success(`Two-Factor Authentication ${user.is2FAEnabled ? 'disabled' : 'enabled'}`);
  //     },
  //     onError: () => {
  //       toast.error('Failed to toggle Two-Factor Authentication');
  //     },
  //   });
  // };
  

  const handleToggle2FA = () => {
    const newValue = !user.is2FAEnabled; // ✅ use the correct key
  
    toggle2FA(newValue, {
      onSuccess: () => {
        toast.success(`Two-Factor Authentication ${newValue ? 'enabled' : 'disabled'}`);
      },
      onError: () => {
        toast.error('Failed to toggle Two-Factor Authentication');
      },
    });
  };


  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Account Settings</h1>
        <p className="text-gray-600">Manage your profile and security settings</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Profile</h2>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  profileForm.reset();
                  setIsEditing(false);
                }}
                className="text-sm px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" /> Cancel
              </button>
              <button
                onClick={profileForm.handleSubmit(handleProfileSave)}
                disabled={isUpdatingProfile}
                className="text-sm px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md flex items-center gap-2 disabled:opacity-50"
              >
                {isUpdatingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {isUpdatingProfile ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>

        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            {profileForm.watch('profilePicture') ? (
              <img
                src={profileForm.watch('profilePicture')}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-medium text-lg border-2 border-gray-200">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
            {isEditing && (
              <>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
                <button
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">{user.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{user.email}</p>
            {user.isEmailVerified ? (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Verified</span>
            ) : (
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">✗ Unverified</span>
            )}
          </div>
        </div>

        <form onSubmit={profileForm.handleSubmit(handleProfileSave)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...profileForm.register('name')}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded-md disabled:bg-gray-50"
            />
            {profileForm.formState.errors.name && (
              <p className="text-red-500 text-sm">{profileForm.formState.errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              {...profileForm.register('email')}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-50 text-gray-500"
            />
          </div>
        </form>
      </div>

      {/* Security Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
        <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-gray-600" /> Security
        </h2>

        {/* Change Password */}
        <form onSubmit={passwordForm.handleSubmit(handlePasswordChange)} className="space-y-4">
          {passwordError && (
            <div className="flex items-center gap-2 text-red-700 bg-red-50 p-3 rounded border border-red-200 text-sm">
              <AlertCircle className="w-4 h-4" />
              {passwordError}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input
              {...passwordForm.register('currentPassword')}
              type="password"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              {...passwordForm.register('newPassword')}
              type="password"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              {...passwordForm.register('confirmPassword')}
              type="password"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={isChangingPassword}
            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2 disabled:opacity-50"
          >
            {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
            {isChangingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </form>

        {/* Two-Factor Authentication Toggle */}
<div className="flex items-center justify-between border-t pt-4">
  <div>
    <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
    <p className="text-sm text-gray-600">
      Add an extra layer of security to your account.
    </p>
  </div>
   {/* <Switch
    checked={user.isTwoFactorEnabled}
   onCheckedChange={handleToggle2FA}
   disabled={isToggling2FA}
  />  */}

{/* <Switch
  checked={user.is2FAEnabled} // ✅ use the same field name
  onCheckedChange={handleToggle2FA}
  disabled={isToggling2FA}
/> */}
<Switch
  checked={user.is2FAEnabled}
  onCheckedChange={handleToggle2FA}
  disabled={isToggling2FA}
/>


</div>


        {/* Last Login */}
        <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
          <Calendar className="w-5 h-5 text-gray-600" />
          <div>
            <h3 className="font-medium text-gray-900">Last Login</h3>
            {/* <p className="text-sm text-gray-600">{formatLastLogin(user?.lastLogin)}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;

