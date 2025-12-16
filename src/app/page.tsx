import AdaptiveNavigation from '@/components/ui/AdaptiveNavigation';
import TopButtons from '@/components/ui/TopButtons';
import InstallGuide from '@/components/ui/InstallGuide';
import UsageInstructions from '@/components/ui/UsageInstructions';
import { MenuMusic } from '@/components/ui/MenuMusic';

export default function Home() {
  return (
    <div className="">
      <UsageInstructions/>
      <AdaptiveNavigation/>
      <TopButtons/>
      <InstallGuide/>
      <MenuMusic/>
    </div>
  );
}
