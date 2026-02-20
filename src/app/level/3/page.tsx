import CodingChallenge from '@/components/CodingChallenge';
import RequireFullAccess from '@/components/RequireFullAccess';

export default function LevelThree() {
  return (
    <RequireFullAccess level={3}>
      <CodingChallenge levelId={3} />
    </RequireFullAccess>
  );
}