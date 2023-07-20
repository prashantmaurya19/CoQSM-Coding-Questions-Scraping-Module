import uid from "../app/uid.js";
export default class CPP {
    uid = uid.toUID("cpp");
    EXTENSION = '.cpp';
    BOILERPLATE = `
#include <iostream>
#include <bits/stdc++.h>
using namespace std;

void solver(){
   //write code here 
}

int main(int argc, char const *argv[])
{
    clock_t start,end;
    start = clock();
    solver();
    end = clock();
    double time_taken = (double(end-start)/double(CLOCKS_PER_SEC))/1000;
    cout<<"Execution Time : "<<fixed<<time_taken<<setprecision(5);
    cout<<"ms"<<endl;
    return 0;
}
    `;
    MULTI_LINE_COMMENT = ["/*", "*/"];
    getBody() {
        return this.BOILERPLATE;
    }
}