import glob
import subprocess
from config import ext, header, footer, static


"""
rendering:
 if we were using a more, err, pythonic templating engine like jade or jinja2,
 we'd make some additional modifications to the api like so:
    ```
    app.jinja_env.addextension('pyjade.ext.jinja.PyJadeExtension')
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    ```
 ...for now, lets just write our own plebeian renderer
"""


class Render(object):

    @staticmethod
    def _html_render(src_list, f):
        """
        :param src_list: ordered list of HTML file chunks to render
        :return: void
        """

        renderf = f + ext

        with open(renderf, "w+") as rendering:
            for item in src_list:
                with open(item) as i:
                    print('rendering ' + item)
                    for line in i:
                        rendering.write(line)
                i.close()
        rendering.close()

    # on launch, check & build renders:
    @classmethod
    def _html_thread(cls):
        # get a list of html files to render:
        html_list = glob.glob(static + '*.html')

        for each in html_list:
            cls._html_render([header, each, footer], each)

    @classmethod
    def _pug_thread(cls):

        # get a list of pug files to render:
        pug_list = glob.glob('*.pug')

        for each in pug_list:
            renderedf = each.split('.')[0]
            print(renderedf)
            cmd = 'pypugjs ' + each + ' ' + static + renderedf + '.html'
            print('prerender: executing ' + cmd)
            subprocess.Popen(cmd, shell=True).wait()

    @classmethod
    def render(cls, pug=False):

        if not pug:
            print('prerendering html chunks @ ' +
                  static + 'templates/' + '--> html; \n' +
                  '(pass `pug=True` to use Pug prerendering')

            cls._html_thread()

        else:
            print('prerendering Pug --> html;')
            cls._pug_thread()

        print('...prerendering complete!  \n:)')
