import { GithubContributions } from "@/registry/github-contributions";

export default function GithubContributionsDemo() {
  return (
    <div className="w-full max-w-lg p-4">
      <GithubContributions weeks={26} username="noisyboy08" />
    </div>
  );
}
