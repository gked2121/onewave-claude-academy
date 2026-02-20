import CodingChallenge from '@/components/CodingChallenge';
import RequireFullAccess from '@/components/RequireFullAccess';

export default function LevelSeven() {
  return (
    <RequireFullAccess level={7}>
      <CodingChallenge levelId={7} />
    </RequireFullAccess>
  );
}