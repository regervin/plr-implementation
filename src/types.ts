export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  hasInput?: boolean;
  inputValue?: string;
  inputPlaceholder?: string;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
}

export interface ChecklistData {
  packageName: string;
  phases: Phase[];
  lastUpdated: string;
}
