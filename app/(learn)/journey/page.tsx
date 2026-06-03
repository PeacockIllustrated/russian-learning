import { StartBanner } from "@/components/journey/StartBanner";
import { JourneyPath } from "@/components/journey/JourneyPath";

// lesson title is the first lesson of unit 1 from seed/unit-01.json
export default function JourneyPage() {
  return (
    <div className="pt-1">
      <StartBanner lessonTitle="Hello and goodbye" />
      <JourneyPath />
    </div>
  );
}
