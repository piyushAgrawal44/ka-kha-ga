import { Plus } from "lucide-react";
import Button from "../../components/ui/button/button";
import PageHeader from "../../components/ui/page-header/page-header";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSendParentInviteMutation } from "../../services/parent-invite.service";
import InviteParentModal from "./components/parent-invite-modal";
import PartnerInvitationsPage from "./components/partner-invite-list";

function ParentManagement() {
  const [showInvite, setShowInvite] = useState(false);

  const [sendInvite, { isLoading }] = useSendParentInviteMutation();

  const handleInviteSubmit = async (email: string) => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const res = await sendInvite({ email }).unwrap();

      if (res.success) {
        toast.success("Invite sent successfully 🎉");
        setShowInvite(false);
      } else {
        toast.error(res.message || "Failed to send invite");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="mb-6">
          <PageHeader title="Parent Management" description="Manage and track all parents" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button icon={Plus} onClick={() => setShowInvite(true)}>
            Invite Parent
          </Button>
        </div>
      </div>

      <div>
        <PartnerInvitationsPage />
      
      </div>

      {/* Invite Modal */}
      <InviteParentModal
        open={showInvite}
        onClose={() => setShowInvite(false)}
        onSubmit={handleInviteSubmit}
        loading={isLoading}
      />
    </>
  );
}

export default ParentManagement;
