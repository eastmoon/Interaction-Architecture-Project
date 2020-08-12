// Library, march and assert
import Assert from "assert";

// Library, axios
import Axios from "axios";

describe('contract testing with axios', function() {
    it('connect to API by GET method.', function () {
        return Axios.get("https://jsonplaceholder.typicode.com/posts/2")
            .then((response) => {
                // console.log("[GET] success");
                // console.log(response.data);
                Assert.ok(Object.keys(response.data).includes("id"));
                Assert.ok(Object.keys(response.data).includes("userId"));
                Assert.ok(Object.keys(response.data).includes("title"));
                Assert.ok(Object.keys(response.data).includes("body"));
                Assert.equal(response.data.id, '2');
            })
            .catch((error) => {
                // console.log("[GET] fail");
                // console.log(error);
                // if don't throw, mocha assert will not catch any message.
                throw error;
            });
    });
    it('connect to API by POST method.', function () {
        return Axios.post("https://jsonplaceholder.typicode.com/posts",
                          JSON.stringify({
                              title: 'foo',
                              body: 'bar',
                              userId: 2
                          }))
            .then((response) => {
                // console.log("[POST] success");
                // console.log(response.data);
                Assert.ok(Object.keys(response.data).includes("id"));
            })
            .catch((error) => {
                //console.log("[POST] fail");
                //console.log(error);
                // if don't throw, mocha assert will not catch any message.
                throw error;
            });
    });
});
