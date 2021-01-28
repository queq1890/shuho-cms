import { FC, createContext, useState, useContext } from 'react';

const PreviewContext = createContext('');
const SetPreviewContext = createContext((val: string) => {
  // no op
  console.log(val);
});

export const usePreviewContext = () => useContext(PreviewContext);
export const useSetPreviewContext = () => useContext(SetPreviewContext);

export const PreviewContextProvider: FC = ({ children }) => {
  const [previewText, setPreviewText] = useState('');

  return (
    <PreviewContext.Provider value={previewText}>
      <SetPreviewContext.Provider value={setPreviewText}>
        {children}
      </SetPreviewContext.Provider>
    </PreviewContext.Provider>
  );
};
