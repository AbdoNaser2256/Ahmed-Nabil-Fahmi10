import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        about: './about.html',
        services: './services.html',
        'before-after': './before-after.html',
        videos: './videos.html',
        'dental-implants': './services/dental-implants.html',
        'hollywood-smile': './services/hollywood-smile.html',
        veneers: './services/veneers.html',
        'root-canal': './services/root-canal.html',
        'childrens-teeth': './services/childrens-teeth.html',
        'gum-depigmentation': './services/gum-depigmentation.html',
        'cosmetic-fillings': './services/cosmetic-fillings.html',
        orthodontics: './services/orthodontics.html',
        'teeth-whitening': './services/teeth-whitening.html',
        'casted-crown': './services/casted-crown.html'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});
