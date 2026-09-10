export type ResumeVariant = {
  slug: string;
  label: string;
  href: string;
  primaryProjects: string[];
};

export const resumes: ResumeVariant[] = [
  {
    slug: "sde",
    label: "SDE Resume",
    href: "/resume/sarthak-makkar-sde.pdf",
    primaryProjects: ["ReachInbox", "Earnease"],
  },
];

export const canonicalResume = resumes[0];
