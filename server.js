const http = require("http");

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 *
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */

const requestListener = (request, response) => {
  //   response.setHeader("Content-Type", "text/html");
  response.setHeader("Content-Type", "application/json");
  response.setHeader("X-Powered-By", "NodeJS");

  // Ambil nilai method dari HTTP Request
  // const method = request.method;

  // Ambil nilai method dari HTTP Request dengan lebih clean
  const { method, url } = request;

  if (url === "/") {
    // curl http://localhost:5000/

    if (method === "GET") {
      // response ketika GET
      response.statusCode = 200;
      //   response.end("<h1>Ini adalah homepage</h1>");
      response.end(
        JSON.stringify({
          message: "Ini adalah homepage",
        })
      );
    } else {
      // response ketika PUT
      response.statusCode = 400;
      //   response.end(
      //     `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
      //   );
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
      );
    }
  } else if (url === "/about") {
    // curl http://localhost:5000/about

    if (method === "GET") {
      // response ketika GET
      response.statusCode = 200;
      //   response.end("<h1>Halo! Ini adalah halaman about</h1>");
      response.end(
        JSON.stringify({
          message: "Halo! Ini adalah halaman about",
        })
      );
    } else if (method === "POST") {
      // response ketika POST

      // Array kosong berfungsi sebagai buffer pada stream
      let body = [];

      // Mengisi data pada request ke dalam buffer dengan chunk (potongan data)
      request.on("data", (chunk) => {
        body.push(chunk);
      });

      // Mengubah data buffer menjadi dara sebenarnya
      request.on("end", () => {
        body = Buffer.concat(body).toString();

        const { name } = JSON.parse(body);

        response.statusCode = 200;
        // response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
        response.end(
          JSON.stringify({
            message: `Halo, ${name}! Ini adalah halaman about`,
          })
        );
      });
    } else {
      response.statusCode = 400;
      //   response.end(
      //     `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
      //   );
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
      );
    }
  } else {
    response.statusCode = 404;
    // response.end(`<h1>Halaman tidak ditemukan!</h1>`);
    response.end(
      JSON.stringify({
        message: "Halaman tidak ditemukan!",
      })
    );
  }

  //   if (method === "GET") {
  //     // response ketika GET
  //     response.end("<h1>Hello!</h1>");
  //   }

  //   if (method === "POST") {
  //     // response ketika POST

  //     // Array kosong berfungsi sebagai buffer pada stream
  //     let body = [];

  //     // Mengisi data pada request ke dalam buffer dengan chunk (potongan data)
  //     request.on("data", (chunk) => {
  //       body.push(chunk);
  //     });

  //     // Mengubah data buffer menjadi dara sebenarnya
  //     request.on("end", () => {
  //       body = Buffer.concat(body).toString();

  //       const { name } = JSON.parse(body);

  //       response.end(`<h1>Hai, ${name}!</h1>`);
  //     });
  //   }

  //   if (method === "PUT") {
  //     // response ketika PUT
  //     response.end("<h1>Bonjour!</h1>");
  //   }

  //   if (method === "DELETE") {
  //     // response ketika DELETE
  //     response.end("<h1>Salam!</h1>");
  //   }
};

const server = http.createServer(requestListener);
const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
