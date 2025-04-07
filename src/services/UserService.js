import axios from "axios";

class UserService {
  getAuthHeader() {
    const token = sessionStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async list() {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users`, {
      headers: this.getAuthHeader(), // Enviar token en los headers
    });
    return response;
  }

  async get(id) {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`, {
      headers: this.getAuthHeader(),
    });
    return response;
  }

  async create(data) {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users`, data, {
      headers: this.getAuthHeader(),
    });
    return response;
  }

  async delete(id) {
    const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`, {
      headers: this.getAuthHeader(),
    });
    return response;
  }

  async update(id, data) {
    const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/users/${id}`, data, {
      headers: this.getAuthHeader(),
    });
    return response;
  }

  async login(data) {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, data);
    return response;
  }
}

export default UserService;
