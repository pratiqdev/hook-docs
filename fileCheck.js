const fs = require('fs')

const hookDocFiles = fs.readdirSync('./docs/hooks')

// console.log(hookDocFiles)

const requiredHeadings = [
    '## Usage',
    '## Demo',
    '## API',
    '### Interfaces',
    '### Config Example',
    '## Return Values',
    '## Hook Methods',
    '## Internal',
    '## Related Hooks',
]

const requiredComponents = [
    '<RelatedTable',
    '<DemoComponent',
]

const deprecatedHeadings = [
    '## Configuration'
]

const results = {}

hookDocFiles.forEach(file => {

    if(file === 'meta.mdx') return;
    
    const fileContents = fs.readFileSync('./docs/hooks/' + file, {encoding: 'utf-8'})

    const res = results[file] = {
        pass: false,
        length: fileContents.length,
        missingHeadings: [],
        missingComponents: [],
        deprecatedHeadings: []
    }
    
    requiredHeadings.forEach(rh => {
        if(!new RegExp(rh).test(fileContents)){
            res.missingHeadings.push(rh)
        }
    })

    requiredComponents.forEach(rc => {
        if(!new RegExp(rc).test(fileContents)){
            res.missingComponents.push(rc)
        }
    })

    deprecatedHeadings.forEach(dh => {
        if(new RegExp(dh).test(fileContents)){
            res.deprecatedHeadings.push(dh)
        }
    })

    if(
        res.missingHeadings.length === 0 
        && res.missingComponents.length === 0
        && res.deprecatedHeadings.length === 0
        && res.length > 2000
    ){
        res.pass = true
    }


    
    
    
})

let contentString = 
`# File Meta 

Last Check:  
${Date.now()}  
${Date().split('GMT')[0]}



`

Object.entries(results).forEach(res => {
    if(res[1].pass) return;

    let filename = res[0]
    let content = res[1]

    contentString += 
`---

## ${filename}

`

if(content.length < 2000){
    contentString +=
`#### Length

${content.length}


`
}


if(content.missingHeadings.length > 0){
    contentString += 
`#### Missing Headings

- ${content.missingHeadings.join('\n- ').replace(/#/g, '')}

`
}

if(content.deprecatedHeadings.length > 0){
    contentString += 
`#### Deprecated Headings

- ${content.deprecatedHeadings.join('\n- ').replace(/#/g, '')}

`
}

if(content.missingComponents.length > 0){
    contentString += 
`#### Missing Components

- ${content.missingComponents.join('\n- ').replace(/</g, '')}

`
}


})

fs.writeFileSync('./docs/hooks/meta.mdx', contentString)

console.log(results)