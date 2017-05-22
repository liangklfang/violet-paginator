//(1)调用方式如下：
//{
  //   body: html,
  //   preloadedState: store.getState()
  // }
//(2)其中body如下:
//  const html = renderToString(
  //   <Provider store={store}>
  //     <App />
  //   </Provider>
  // )
export default ({ body, preloadedState }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>VioletPaginator</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans:400,500">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/violet/0.0.1/violet.min.css">
      </head>
      <body>
        <div id="root">${body}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
      </body>
      <script src="/assets/bundle.js"></script>
    </html>
  `
}
