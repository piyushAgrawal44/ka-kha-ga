import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle, ArrowLeft, Loader2, Sparkles, Star } from 'lucide-react';

import {
  useValidateParentInviteQuery,
  useAcceptParentInviteMutation,
  useRejectParentInviteMutation,
} from '../../services/parent-invite.service';
import { Link, useNavigate } from 'react-router-dom';

type ActionType = 'accepted' | 'rejected' | null;


const ParentInvitePage: React.FC = () => {

  const navigate = useNavigate();
  // Extract encryptedId from URL
  const getEncryptedIdFromUrl = (): string | null => {
    const path = window.location.pathname;
    const matches = path.match(/\/parent-invite\/([^/]+)/);
    return matches ? matches[1] : null;
  };

  const encryptedId = getEncryptedIdFromUrl();
  const [error, setError] = useState<string | null>(null);
  const [actionComplete, setActionComplete] = useState<boolean>(false);
  const [actionType, setActionType] = useState<ActionType>(null);
  const {
    data: validateData,
    isLoading,
    error: validateError,
  } = useValidateParentInviteQuery(encryptedId!, {
    skip: !encryptedId,
  });

  const inviteData = validateData?.data || null;

  const [acceptInvite, { isLoading: accepting }] = useAcceptParentInviteMutation();

  const [rejectInvite, { isLoading: rejecting }] = useRejectParentInviteMutation();


  const handleAccept = async (): Promise<void> => {
    if (!encryptedId) return;

    try {
      const response = await acceptInvite(encryptedId!).unwrap();

      if (response.success) {
        setActionType('accepted');
        setActionComplete(true);
      }
    } catch (err) {
      setError('Failed to accept invitation. Please try again.');

    }
  };

  const handleReject = async (): Promise<void> => {
    if (!encryptedId) return;

    try {
      const response = await rejectInvite(encryptedId!).unwrap();
      if (response.success) {
        setActionType('rejected');
        setActionComplete(true);
      }
    } catch (err) {
      setError('Failed to reject invitation. Please try again.');
    }
  };

  const formatTimeRemaining = (expiryDate: string): string => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diff = expiry.getTime() - now.getTime();

    if (diff <= 0) return 'Expired';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} remaining`;
    } else {
      return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
    }
  };

  const handleGoBack = (): void => {
    navigate(-1);
  };

  // Background Decorations Component
  const BackgroundDecorations: React.FC = () => (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-10 w-32 h-32 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <BackgroundDecorations />
        <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border-8 border-purple-300 max-w-md w-full text-center">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"></div>
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-black text-gray-900 mb-2">Validating Invitation</h2>
          <p className="text-gray-600 font-semibold">Please wait while we verify your invitation link...</p>
        </div>
      </div>
    );
  }

  // Action Complete State
  if (actionComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <BackgroundDecorations />
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-8 border-purple-300 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"></div>

            {actionType === 'accepted' ? (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-3xl mb-4 shadow-xl border-4 border-white">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Invitation Accepted!</h2>
                <p className="text-gray-600 font-semibold mb-6">
                  You have successfully accepted the invitation from <span className="text-purple-600 font-black">{inviteData?.partnerName}</span>.
                </p>
              </>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-3xl mb-4 shadow-xl border-4 border-white">
                  <XCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Invitation Rejected</h2>
                <p className="text-gray-600 font-semibold mb-6">
                  You have declined the invitation from <span className="text-purple-600 font-black">{inviteData?.partnerName}</span>.
                </p>
              </>
            )}

            <Link
              to={`/dashboard`}
              replace={true}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white py-3 px-6 rounded-full font-black hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Go to Dashboard
            </Link>

            <div className="mt-6 flex items-center justify-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-gray-500 font-semibold">
                Partnership Established
              </span>
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (validateError || !inviteData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <BackgroundDecorations />
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-8 border-purple-300 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"></div>

            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-400 to-red-500 rounded-3xl mb-4 shadow-xl border-4 border-white">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Invalid or Expired Link</h2>
            <p className="text-gray-600 font-semibold mb-6">
              {error || 'This invitation link is invalid or has expired. Please contact the organization for a new invitation.'}
            </p>
            <button
              onClick={handleGoBack}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white py-3 px-6 rounded-full font-black hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>

            <div className="mt-6 flex items-center justify-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
              <span className="text-xs text-gray-500 font-semibold">
                Need Help?
              </span>
              <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Valid Invite State
  const timeRemaining = formatTimeRemaining(inviteData.expiryAt);
  const isExpired = timeRemaining === 'Expired';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <BackgroundDecorations />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-8 border-purple-300 relative overflow-hidden">
          {/* Top Decoration Bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-300"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 rounded-3xl mb-4 shadow-xl border-4 border-white animate-bounce">
              <Sparkles className="w-8 h-8 text-white" fill="white" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              New Invitation
            </h1>
            <p className="text-gray-600 font-semibold">
              You've been invited to connect with a partner
            </p>
          </div>

          {/* Invitation Details */}
          <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 rounded-2xl p-6 mb-6 space-y-4 border-4 border-purple-200">
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-1">Partner Name</p>
              <p className="text-xl font-black text-gray-900">{inviteData.partnerName}</p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className={`w-5 h-5 ${isExpired ? 'text-red-500' : 'text-purple-600'}`} />
              <span className={`font-bold ${isExpired ? 'text-red-600' : 'text-gray-700'}`}>
                Expiry: {timeRemaining}
              </span>
            </div>

            {isExpired && (
              <div className="bg-red-50 border-4 border-red-200 rounded-xl p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 font-semibold">
                  This invitation has expired. Please contact the partner for a new invitation.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {!isExpired && (
            <div className="space-y-3">
              <button
                onClick={handleAccept}
                disabled={accepting}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white py-3 px-6 rounded-full font-black hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {accepting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Accept Invitation
                  </>
                )}
              </button>

              <button
                onClick={handleReject}
                disabled={rejecting}
                className="w-full bg-white text-gray-700 py-3 px-6 rounded-full font-black border-4 border-purple-300 hover:bg-gray-50 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                Reject Invitation
              </button>
            </div>
          )}

          {isExpired && (
            <button
              onClick={handleGoBack}
              className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white py-3 px-6 rounded-full font-black hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          )}

          {/* Info Text */}
          {!isExpired && (
            <p className="text-xs text-gray-500 text-center mt-6 font-semibold">
              By accepting this invitation, you agree to share your information with {inviteData.partnerName}
            </p>
          )}

          {/* Bottom Decoration */}
          <div className="mt-8 flex items-center justify-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="text-xs text-gray-500 font-semibold">
              Secure Partnership Portal
            </span>
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentInvitePage;