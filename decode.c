/* becode.c - stegwasm C source for decoder
 * Author: (Dylan Muller)
 */

#define NULL 0
#define STR_MAX 255

// Javascript imports.
extern void init_payload(char * buffer, int size);
extern void *malloc(unsigned int bytes);

// Main decode routine.
void decode(char * source, int len)
{
  char c;
  char last_c;
  char *c_ptr = source;
  char *pl_buf;
  int g_l = 0;
	
  while(c_ptr < source+len){
    c = *c_ptr;
    if (c != '\0') {
      if (last_c == (signed char)0x21 && 
          c == (signed char)0xFE) 
      {
        c_ptr+=1;
      	int  * len_ptr = ( int *)c_ptr;
        int length = *len_ptr;
        c_ptr+=4;
      	pl_buf = (char*)malloc(sizeof(char) * length + 1);
        g_l = length -1;
      	for(int i = 0; i < length; ++i)
	{
          c = *c_ptr;
          c_ptr+=1;
	  pl_buf[i] = c;
        }
      }
      last_c = c;
    }
     c_ptr+=1;
} 

// Decode complete, init payload!
init_payload(pl_buf, g_l);
};
