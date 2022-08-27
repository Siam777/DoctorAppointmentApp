import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'timeTransformTo12H' })

export class TimeTransformPipe implements PipeTransform {
    transform(value: string): string {
        if (!value)
            return ''
        else {
            return new Date('1970-01-01T' + value + 'Z')
                .toLocaleTimeString('en-US',
                    {
                        timeZone: 'UTC',
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric'
                    }
                );
        }
    }
}