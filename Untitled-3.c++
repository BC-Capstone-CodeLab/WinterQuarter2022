int main(int argc, char*argv[]) {
    int x = 5;
    int y = 10;
    int w, z = 0;

    int rc = fork();

    if (rc == 0) {
        w = x * y;
        w++;
        printf("w = %d\n", w);
    } 
    else {
        w = y-x;
        printf( "w = %d\n", w);
    }

    z = w + 1;
    printf("z = $d\n", z);

    return 0;
}