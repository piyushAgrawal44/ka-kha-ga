import { X, Send } from "lucide-react";
import { useState } from "react";
import Button from "../../../components/ui/button/button";
import Input from "../../../components/ui/input/Input";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
    loading: boolean;
}

const InviteParentModal: React.FC<Props> = ({ open, onClose, onSubmit, loading }) => {
    const [email, setEmail] = useState("");

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
                {/* Close Btn */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full"
                >
                    <X className="w-5 h-5 text-gray-600" />
                </button>

                <h2 className="text-xl font-bold mb-2">Invite Parent</h2>
                <p className="text-sm text-gray-600 mb-4">Enter parent email to send an invitation.</p>

                {/* Input */}
                <Input
                    type="email"
                    placeholder="Enter parent email..."
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    onKeyDown={(event: any)=>{
                        if(event.key=="Enter"){
                            onSubmit(email);
                        }
                    }}
                />

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">
                    <Button
                        type="button" variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button

                        type="submit"
                        icon={Send}
                        loading={loading}
                        disabled={loading}
                        onClick={() => onSubmit(email)}
                    >
                        Send Invite
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InviteParentModal;
