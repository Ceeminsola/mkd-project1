const BASE_URL = "https://reacttask.mkdlabs.com/v1/api/rest";

const defaultHeaders = {
  "Content-Type": "application/json",
  "x-project": "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==",
};

export const paginateVideos = async (page, limit, token) => {
  try {
    const config = {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        payload: {},
        page: page,
        limit: limit,
      }),
    };

    const response = await fetch(`${BASE_URL}/video/PAGINATE`, config);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw `Error fetching videos: ${error}`;
  }
};