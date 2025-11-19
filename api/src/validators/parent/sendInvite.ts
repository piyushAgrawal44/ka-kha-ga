import { z } from "zod";

class ParentInviteValidation {

    /**
     * Validation for: sendInvite()
     */
    static sendInviteSchema = z.object({
        body: z.object({
            email: z.string().email("Invalid email format")
        })
    });

    /**
     * Validation for: validateInvite()
     * Query param or route param depends on your route
     */
    static validateInviteSchema = z.object({
        params: z.object({
            encryptedId: z.string().min(1, "Invalid or missing invitation id")
        })
    });

    /**
     * Validation for: acceptInvite()
     */
    static acceptInviteSchema = z.object({
        params: z.object({
            encryptedId: z.string().min(1, "Invalid or missing invitation id")
        })
    });

    /**
     * Validation for: rejectInvite()
     */
    static rejectInviteSchema = z.object({
        params: z.object({
            encryptedId: z.string().min(1, "Invalid or missing invitation id")
        })
    });
}

export default ParentInviteValidation;
