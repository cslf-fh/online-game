const usePageTile = () => {
  const title = '3目(しかない)並べ';
  const separator = ' | ';
  const titleWithSeparator = `${separator}${title}`;

  const pageTitle = (path: string) => {
    const spritPath = path.split('/');

    switch (spritPath[1]) {
      case 'lobby':
        return `ロビー${titleWithSeparator}`;
      case 'matching':
        return `マッチング待機中${titleWithSeparator}`;
      case 'room':
        return `対戦${titleWithSeparator}`;
      default:
        return title;
    }
  };

  return { pageTitle };
};

export default usePageTile;
