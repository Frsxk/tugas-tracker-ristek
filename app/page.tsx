import { FeatureGrid } from "@/components/sections/feature-grid";
import { HeroSection } from "@/components/sections/hero";

const featureList = [
  {
    title: "Course Management",
    description:
      "Centralize syllabi, contact info, and schedules for every course you take this semester.",
    href: "/course-management",
    icon: "school",
  },
  {
    title: "Task Management",
    description:
      "Capture assignments, labs, and reminders in organized lists with smart grouping.",
    href: "/task-management",
    icon: "task_alt",
  },
  {
    title: "Task Tracker",
    description:
      "Visualize deadlines and completion history to keep momentum steady week after week.",
    href: "/task-tracker",
    icon: "monitoring",
  },
  {
    title: "Grade Calculator",
    description:
      "Predict final grades by inputting weightages and scores.",
    href: "#coming-soon",
    icon: "calculate",
  },
  {
    title: "Absence Tracker",
    description:
      "Monitor attendance vs. tolerance with a contributions-style grid.",
    href: "#coming-soon",
    icon: "event_available",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12">
      <HeroSection />
      <FeatureGrid features={featureList} />
    </div>
  );
}
