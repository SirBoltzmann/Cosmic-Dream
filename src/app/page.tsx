import AdaptiveNavigation from '@/components/ui/AdaptiveNavigation';
import TopButtons from '@/components/ui/TopButtons';
import InstallGuide from '@/components/ui/InstallGuide';
import UsageInstructions from '@/components/ui/UsageInstructions';

export default function Home() {
  return (
    <div className="">
      <UsageInstructions/>
      <AdaptiveNavigation/>
      <TopButtons/>
      <InstallGuide/>
    </div>
  );
}
