/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import { join } from 'path';
import { Router } from 'express';
import jade from 'jade';
import fm from 'front-matter';
import fs from '../utils/fs';
import request from 'superagent';

// A folder with Jade/Markdown/HTML content pages
const CONTENT_DIR = join(__dirname, './content');

// Extract 'front matter' metadata and generate HTML
const parseJade = (path, jadeContent) => {
  const fmContent = fm(jadeContent);
  const htmlContent = jade.render(fmContent.body);
  return Object.assign({ path, content: htmlContent }, fmContent.attributes);
};

const router = new Router();

router.get('/', async (req, res, next) => {
  try {
    const path = req.query.path;

    if (!path || path === 'undefined') {
      res.status(400).send({error: `The 'path' query parameter cannot be empty.`});
      return;
    }

    let fileName = join(CONTENT_DIR, (path === '/' ? '/index' : path) + '.jade');
    if (!await fs.exists(fileName)) {
      fileName = join(CONTENT_DIR, path + '/index.jade');
    }

    if (!await fs.exists(fileName)) {
      res.status(404).send({error: `The page '${path}' is not found.`});
    } else {
      const source = await fs.readFile(fileName, { encoding: 'utf8' });
      const content = parseJade(path, source);
      res.status(200).send(content);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', function(req,res){
    
    request
     .post(process.env.BACKEND_URL)
     .set('Content-type','text/plain;charset=UTF-8')
     .send(req.body)
     .end(function(err, backendResponse){
       res.status(backendResponse.status).type("application/json").send(backendResponse.text)
    })
   }
  );

router.post('/stacks/:hash/issues', function(req,res){
    
    request
     .post(process.env.BACKEND_URL+"/stacks/"+req.params.hash+"/issues")
     .set('Content-type','application/json;charset=UTF-8')
     .send(req.body)
     .end(function(err, backendResponse){
       res.status(backendResponse.status)
    })
   }
  );

export default router;

