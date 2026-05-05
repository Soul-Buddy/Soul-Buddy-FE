import { User } from "lucide-react";
import { Avatar } from "@/shared/ui/Avatar";
import { IconButton } from "@/shared/ui/IconButton";
import buddyImage from "@/shared/assets/helloIcon.png";

interface MainGreetingProps {
  userName: string;
  onProfileClick?: () => void;
}

export function MainGreeting({ userName, onProfileClick }: MainGreetingProps) {
  return (
    <section className="flex items-start justify-between gap-3 pt-2">
      <div className="flex items-center gap-3">
        <Avatar src={buddyImage} alt="" size="lg" background="primary" />
        <div className="flex flex-col gap-1">
          <span className="text-[15px] text-[var(--color-text-muted)]">
            안녕, {userName}님
          </span>
          <span className="text-[20px] font-bold leading-tight text-[var(--color-text)]">
            오늘의 마음은
            <br />
            어떠세요?
          </span>
        </div>
      </div>
      <IconButton
        variant="surface"
        size="md"
        aria-label="프로필"
        onClick={onProfileClick}
      >
        <User />
      </IconButton>
    </section>
  );
}
