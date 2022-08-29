const usePageTile = () => {
  const title = useState('title', () => '3目(しかない)並べ');
  const description = useState(
    'description',
    () =>
      '理由(ワケ)あって石が3目しかない3目並べです。それ以外は普通の3目並べです。'
  );
  const url = useState('url', () => 'https://online-game-3f9fe.web.app');
  const separator = ' | ';
  const titleWithSeparator = `${separator}${title.value}`;

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
        return title.value;
    }
  };

  return {
    title: readonly(title),
    description: readonly(description),
    url: readonly(url),
    pageTitle,
  };
};

export default usePageTile;
