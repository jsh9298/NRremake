export const loader = `
    relative            
    inline-block       
    w-[2em]                
    aspect-[1]       
    rounded-full         
    animate-[loader_0.5s_linear_infinite] 
    border-4            
    border-t-current    
    border-r-transparent 
    border-b-transparent
    border-l-current 
    before:content-[''] 
    before:absolute     
    before:top-0         
    before:right-0        
    before:w-[calc(2em * 0.172)]         
    before:aspect-[1]
    before:rounded-full  
    before:bg-current    
    after:content-[''] 
    after:absolute     
    after:bottom-0         
    after:left-0        
    after:w-[calc(2em * 0.172)]         
    after:aspect-[1]
    after:rounded-full  
    after:bg-current     
  `.replace(/\s+/g, ' ').trim();

export const box = `
h-screen
grid 
place-items-center 
overflow-hidden 
bg-background 
text-foreground
`.replace(/\s+/g, ' ').trim();