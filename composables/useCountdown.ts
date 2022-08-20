const useCountdown = () => {
  const countdown = useState('countdown', () => 199);
  const circular = useState('circular', () => 100);
  const showCancelAlert = useState('showCancelAlert', () => false);
  const intervalId = useState<NodeJS.Timer | undefined>(
    'interval',
    () => undefined
  );

  // カウントダウン開始
  const startCountdown = () => {
    clearInterval(intervalId.value);
    intervalId.value = setInterval(() => {
      // カウントダウンが0になった場合
      if (countdown.value === 0) {
        showCancelAlert.value = true; // アラートを表示
        return;
      }

      countdown.value--;
      circular.value === 0
        ? (circular.value = 100)
        : circular.value === 12
        ? (circular.value = 0)
        : (circular.value -= 11);
    }, 1000);
  };

  // カウントダウン停止
  const stopCountdown = () => {
    clearInterval(intervalId.value);
  };

  // カウントダウン初期化
  const resetCountdown = () => {
    countdown.value = 199;
    circular.value = 100;
    showCancelAlert.value = false;
  };

  return {
    countdown: readonly(countdown),
    circular: readonly(circular),
    showCancelAlert: readonly(showCancelAlert),
    startCountdown,
    stopCountdown,
    resetCountdown,
  };
};

export default useCountdown;
