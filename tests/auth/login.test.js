const jest = require('jest');
const { login } = require("../../controllers/auth");

describe("Login Controller", () => {
  it("should return status code 200 and token in the response", async () => {
    const req = {
      body: { email: "some@email.com", password: "password" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      token: expect.any(String),
      user: expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      }),
    }));
  });
});