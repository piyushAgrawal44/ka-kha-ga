import { z } from "zod";

class ParentInviteValidation {
    static inviteSchema = z.object({
        body: z.object({
            email: z.email("Invalid email format"),
        }),
    });
}


export default ParentInviteValidation;