import { GithubContributions } from "@/registry/github-contributions";

export default function GithubContributionsDemo() {
  return (
    <div className="w-full max-w-3xl">
      <GithubContributions username="noisyboy08" />
    </div>
  );
}
