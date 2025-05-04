export const PASSWORD = "123456";

export const Emma = "Emma";
export const Emily = "Emily";
export const CandidatesList = [Emma, Emily] as const;
export type CandidatesList = (typeof CandidatesList)[number];
