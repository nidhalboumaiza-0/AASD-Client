const LocalStorageService = (function () {
    const _setToken = (accessToken) => {
      localStorage.setItem("access_token", accessToken);
    };
  
    const _getAccessToken = () => {
      return localStorage.getItem("access_token");
    };
  
    const _clearToken = () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    };
  
    const _setAccessToken = (accessToken) => {
      localStorage.setItem("access_token", accessToken);
    };
  
    const _getRefreshToken = () => {
      return localStorage.getItem("refresh_token");
    };
  
    const _setRefreshToken = (refresh_token) => {
      localStorage.setItem("refresh_token", refresh_token);
    };

    const _setUser = (user) => {
      localStorage.setItem("x_angle_user", JSON.stringify(user));
    };
  
    const _getUser = () => {
      return JSON.parse(localStorage.getItem("x_angle_user"));
    };
  
    return {
      getUser: _getUser,
      setUser: _setUser,
      setToken: _setToken,
      getRefreshToken: _getRefreshToken,
      setRefreshToken: _setRefreshToken,
      setAccessToken: _setAccessToken,
      getAccessToken: _getAccessToken,
      clearToken: _clearToken,
    };
  })();
  
  export default LocalStorageService;