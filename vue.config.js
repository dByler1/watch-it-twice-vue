

// module.exports = {
//     css: {
//         loaderOptions: {
//             options: {
//                 prependData: `@import "@/assets/styles/custom.scss";`
            
//             },
//         },
//     },
// }

// module.exports = {
//     module: {
//         rules: [
//             // ... other rules omitted

//             // this will apply to both plain `.scss` files
//             // AND `<style lang="scss">` blocks in `.vue` files
//             {
//                 test: /\.scss$/,
//                 use: [
//                     'vue-style-loader',
//                     'css-loader',
//                     'sass-loader'
//                 ]
//             }
//         ]
//     },
//     // plugin omitted
// }

// module.exports = {
//     configureWebpack: {
//         module: {
//         rules: [
//             // ... other rules omitted

//             // this will apply to both plain `.scss` files
//             // AND `<style lang="scss">` blocks in `.vue` files
//             {
//                 test: /\.scss$/,
//                 use: [
//                     'vue-style-loader',
//                     'css-loader',
//                     'sass-loader'
//                 ]
//             }
//         ]
//     },
//     },
// }

// module.exports = {
//     css: {
//         loaderOptions: {
//            scss: {
//                 rules: [
//                     {
//                         test: /\.s[ac]ss$/i,
//                         use: [
//                             // Creates `style` nodes from JS strings
//                             'vue-style-loader',
//                             // Translates CSS into CommonJS
//                             'css-loader',
//                             // Compiles Sass to CSS
//                             'sass-loader',
//                         ],
//                     },
//                 ],
//                 // test: /\.scss$/,
//                 // use: [
//                 //     'vue-style-loader',
//                 //     'css-loader',
//                 //     'sass-loader'
//                 // ]
//             } 
//         }
        
//     }
// }
