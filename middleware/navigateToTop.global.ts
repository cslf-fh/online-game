export default defineNuxtRouteMiddleware((to, from) => {
  const { $userInfo } = useNuxtApp();

  if (to.path === '/') return; // トップへ戻ってきたら何もしない
  if ($userInfo.value === undefined) return navigateTo('/'); // ユーザ情報を取得できていない(リロードなどで)時はトップへリダイレクト
});
