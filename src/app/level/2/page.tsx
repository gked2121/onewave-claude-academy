import CodingChallenge from '@/components/CodingChallenge';
import RequireFullAccess from '@/components/RequireFullAccess';

export default function LevelTwo() {
  return (
    <RequireFullAccess level={2}>
      <CodingChallenge levelId={2} />
    </RequireFullAccess>
  );
}
