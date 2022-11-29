import React, { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext(null);
export default function Context({ children }) {
  const [profile, setProfile] = useState(null);
  const store = useMemo(
    () => ({
      profile,
      setProfile,
    }),
    [profile]
  );
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
