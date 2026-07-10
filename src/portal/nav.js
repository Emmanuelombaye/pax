/** Patient Center navigation — desktop sidebar + mobile map */

export const PORTAL_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'home' },
  {
    id: 'appointments',
    label: 'Appointments',
    icon: 'calendar',
    children: [
      { id: 'upcoming', label: 'Upcoming' },
      { id: 'history', label: 'History' },
      { id: 'join', label: 'Join Visit' },
    ],
  },
  { id: 'messages', label: 'Messages', icon: 'message', badge: 'messages' },
  {
    id: 'health',
    label: 'Health',
    icon: 'heart',
    children: [
      { id: 'records', label: 'Medical Records' },
      { id: 'labs', label: 'Lab Results' },
      { id: 'vitals', label: 'Vitals' },
      { id: 'wellness', label: 'Wellness' },
      { id: 'plans', label: 'Treatment Plans' },
    ],
  },
  {
    id: 'medications',
    label: 'Medications',
    icon: 'pill',
    children: [
      { id: 'prescriptions', label: 'Prescriptions' },
      { id: 'refills', label: 'Refills' },
      { id: 'reminders', label: 'Reminders' },
    ],
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    icon: 'activity',
    children: [
      { id: 'bp', label: 'Blood Pressure' },
      { id: 'hr', label: 'Heart Rate' },
      { id: 'weight', label: 'Weight' },
      { id: 'glucose', label: 'Glucose' },
      { id: 'devices', label: 'Connected Devices' },
    ],
  },
  { id: 'insurance', label: 'Insurance', icon: 'shield' },
  { id: 'billing', label: 'Billing', icon: 'card' },
  { id: 'documents', label: 'Documents', icon: 'file' },
  { id: 'family', label: 'Family', icon: 'users' },
  { id: 'ai', label: 'AI Assistant', icon: 'spark' },
  { id: 'notifications', label: 'Notifications', icon: 'bell', badge: 'notifications' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'support', label: 'Support', icon: 'help' },
];

/** Primary mobile bottom bar */
export const MOBILE_PRIMARY = [
  'dashboard',
  'appointments',
  'messages',
  'health',
  'more',
];

export function defaultChild(sectionId) {
  const item = PORTAL_NAV.find((n) => n.id === sectionId);
  return item?.children?.[0]?.id || null;
}

export function parsePortalRoute(hash = window.location.hash) {
  const raw = hash.replace(/^#\/?/, '');
  const parts = raw.split('/').filter(Boolean);
  // ['portal'] | ['portal', 'dashboard'] | ['portal', 'appointments', 'upcoming']
  if (parts[0] !== 'portal') {
    return { section: 'dashboard', panel: null };
  }
  const section = parts[1] || 'dashboard';
  const panel = parts[2] || defaultChild(section);
  return { section, panel };
}

export function portalHref(section, panel) {
  if (!panel) return `#/portal/${section}`;
  return `#/portal/${section}/${panel}`;
}
