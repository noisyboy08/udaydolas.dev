import { AvatarGroup } from "@/registry/avatar-group";

const USERS = [
  { name: "Uday Dolas" }, { name: "Alex Chen" }, { name: "Priya Sharma" },
  { name: "Jordan Lee" }, { name: "Sarah Kim" }, { name: "Marco Rossi" },
  { name: "Aisha Patel" }, { name: "Tom Zhang" },
];

export default function AvatarGroupDemo() {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <AvatarGroup avatars={USERS} size="sm" max={5} />
      <AvatarGroup avatars={USERS} size="md" max={4} />
      <AvatarGroup avatars={USERS} size="lg" max={3} />
    </div>
  );
}
