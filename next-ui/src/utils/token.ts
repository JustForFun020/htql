let token: any = null;
if (typeof window !== 'undefined') {
  token = localStorage.getItem('token');
}

export default token;
