/** Minimal inline icons for portal nav */

const paths = {
  home: 'M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z',
  calendar: 'M7 3v2m10-2v2M4 9h16M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
  message: 'M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
  heart: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z',
  pill: 'M8.5 3.5 3.5 8.5a5 5 0 0 0 7 7L15.5 10.5a5 5 0 1 0-7-7Zm1.2 1.2 5.6 5.6',
  activity: 'M3 12h4l2-6 4 12 2-6h6',
  shield: 'M12 3 5 6v6c0 5 3.5 8.5 7 9 3.5-.5 7-4 7-9V6l-7-3Z',
  card: 'M3 8h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm0 0 2-3h14l2 3',
  file: 'M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm7 0v5h5',
  users: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.5 19a4.5 4.5 0 0 1 9 0M11.5 19a4.5 4.5 0 0 1 9 0',
  spark: 'M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18',
  bell: 'M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2Zm6-6V11a6 6 0 1 0-12 0v5l-2 2h16l-2-2Z',
  settings: 'M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm8.2 2.7-1.7-.3a6.8 6.8 0 0 0-.6-1.4l1-1.4-1.8-1.8-1.4 1a6.8 6.8 0 0 0-1.4-.6l-.3-1.7h-2.6l-.3 1.7a6.8 6.8 0 0 0-1.4.6l-1.4-1-1.8 1.8 1 1.4a6.8 6.8 0 0 0-.6 1.4l-1.7.3v2.6l1.7.3c.1.5.3 1 .6 1.4l-1 1.4 1.8 1.8 1.4-1c.4.3.9.5 1.4.6l.3 1.7h2.6l.3-1.7c.5-.1 1-.3 1.4-.6l1.4 1 1.8-1.8-1-1.4c.3-.4.5-.9.6-1.4l1.7-.3v-2.6Z',
  help: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-3.2h.01M9.5 9.2A2.5 2.5 0 1 1 12 12v1.2',
  more: 'M6 12h.01M12 12h.01M18 12h.01',
};

export function Icon({ name = 'home', size = 20 }) {
  const d = paths[name] || paths.home;
  return (
    <svg className="pc-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
