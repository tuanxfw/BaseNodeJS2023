import { defineConfig, loadEnv } from "vite";
import { VitePluginNode } from "vite-plugin-node";
import { fileURLToPath, URL } from "url";

export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  console.log({ env });

  return {
    ssr: {
      format: "esm",
    },
    server: {
      host: true,
      port: Number(env.VITE_PORT),
    },
    build: {
      sourcemap: false,
      copyPublicDir: false,
      ssr: true,
      minify: true
    },
    plugins: [
      ...VitePluginNode({
        // Nodejs native Request adapter
        // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
        // you can also pass a function if you are using other frameworks, see Custom Adapter section
        adapter: "express",

        // tell the plugin where is your project entry
        appPath: "./src/server.ts",

        // Optional, default: 'viteNodeApp'
        // the name of named export of you app from the appPath file
        exportName: "viteNodeApp",

        // Optional, default: 'esbuild'
        // The TypeScript compiler you want to use
        // by default this plugin is using vite default ts compiler which is esbuild
        // 'swc' compiler is supported to use as well for frameworks
        // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
        // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
        tsCompiler: "esbuild",

        // Optional, default: {
        // jsc: {
        //   target: 'es2019',
        //   parser: {
        //     syntax: 'typescript',
        //     decorators: true
        //   },
        //  transform: {
        //     legacyDecorator: true,
        //     decoratorMetadata: true
        //   }
        // }
        // }
        // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
        swcOptions: {},
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: fileURLToPath(new URL("./src", import.meta.url)),
        },
        {
          find: "@configs",
          replacement: fileURLToPath(new URL("./src/configs", import.meta.url)),
        },
        {
          find: "@constants",
          replacement: fileURLToPath(new URL("./src/constants", import.meta.url)),
        },
        {
          find: "@controllers",
          replacement: fileURLToPath(new URL("./src/controllers", import.meta.url)),
        },
        {
          find: "@servicesS",
          replacement: fileURLToPath(new URL("./src/servicesS", import.meta.url)),
        },
        {
          find: "@interfaces",
          replacement: fileURLToPath(new URL("./src/interfaces", import.meta.url)),
        },
        {
          find: "@utils",
          replacement: fileURLToPath(new URL("./src/utils", import.meta.url)),
        },
        {
          find: "@middlewares",
          replacement: fileURLToPath(new URL("./src/middlewares", import.meta.url)),
        },
      ],
    },
    optimizeDeps: {
      // Vite does not work well with optionnal dependencies,
      // you can mark them as ignored for now
      // eg: for nestjs, exlude these optional dependencies:
      // exclude: [
      //   '@nestjs/microservices',
      //   '@nestjs/websockets',
      //   'cache-manager',
      //   'class-transformer',
      //   'class-validator',
      //   'fastify-swagger',
      // ],
    },
  };
});
