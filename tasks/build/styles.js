/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import postcssAssets from 'postcss-assets';
import postcssImport from 'postcss-import';
import postcssEach from 'postcss-each';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssRef from 'postcss-reference';
import postcssVars from 'postcss-simple-vars';
import postcssMqPacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';

export default function factory($, env) {
    return function task(done) {
        return $.gulp.src(path.join(env.paths.input.styles, '/**/*.css'))
            .pipe($.postcss([
                postcssAssets({
                    relative: true
                }),
                postcssImport,
                postcssEach,
                postcssMixins,
                postcssNested,
                postcssRef,
                postcssVars,
                postcssMqPacker,
                autoprefixer({ browsers: ['last 2 versions'] })
            ]))
            .pipe($.if(env.build.minify, $.cssnano()))
            .pipe($.concat('bundle.css'))
            .pipe($.gulp.dest(env.paths.output.styles))
            .on('error', done);
    };
}
