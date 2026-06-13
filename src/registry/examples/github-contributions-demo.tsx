import { GithubContributions } from "@/registry/github-contributions";

export default function GithubContributionsDemo() {
  return (
    <div className="w-full max-w-lg">
      <GithubContributions weeks={24} username="noisyboy08" />
    </div>
  );
}
